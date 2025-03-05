---
date: 2014-10-31
title: Running Multiple Dockerized Sites plus Private Docker Registry on a Single Digital Ocean Droplet
slug: Running-Multiple-Dockerized-Sites-plus-Private-Docker-Registry-on-a-Single-Digital-Ocean-Droplet
summary: Using a containerised reverse proxy to run multiple projects on a Digital Ocean docker host
---

![docker logo](https://d3oypxn00j2a10.cloudfront.net/0.12.6/img/homepage/docker-whale-home-logo.png?e2946566d408)

## The problem
I wanted to move a site, this site in fact, from running on my raspberry pi at home to Digital Ocean so as not to have to keep tinkering with flaky dynamic dns issues, but I didn't want to use up an entire droplet for it. While $5 per month isn't much, its totally overkill and it adds up when you start running multiple sites. Furthermore I wanted to experiment with dockerizing it to play with some of the things I've been reading about. This had the added aspect of working out how to manage proprietary code / configuration with docker, since the code for the blog is currently private (out of shame) and the config needs to be as it contains OAuth keys for google log in.

## The Solution
### TL;DR
Setup a digital ocean droplet to run docker, then run the docker registry container, a clever automatic reverse proxy, plus any sites I want all on that droplet.

### Dockerizing the site
This blog is a basic node.js application which uses express.js and a cloud hosted (and free) mongodb database for the posts and comments. Mongo is really overkill for this task, but I wrote the blog as a dummy project to tinker with mongo a couple of years back in the first place.

Since the site is relatively simple, dockerizing it was also simple. I just cloned my code out to a dir on my boot2docker vm (note, if like me you're on a mac and using boot2docker you are inside a vm and will need to generate and upload *it's* ssh keys to github in order to clone etc) then created a Dockerfile inside my apps main directory with the following 

```
FROM node
COPY . /src
WORKDIR /src
RUN ["npm", "install"]
EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "/src/app.js"]
```

still inside boot2docker I built this using
 `docker build -t localhost:5000/node-blog .`
in the same directory (the . tells docker the Dockerfile is in the current directory). Running with the minus t option allows us to tag the resulting image. Note that I've not used my docker hub username, but rather, localhost:5000 since this isn't going to be uploaded to the public docker hub.

I ran this up for a quick test with `docker run -ti -p -rm 3000:3000 localhost:5000/node-blog` I've used -ti to make it an interactive session with the terminal connected since this is just a quick test and its useful to see any console output from the app. The -rm option tells docker to delete the container when I exit.

This seemed to work, so I checked the Dockerfile into my applications git repo. Now to run it somewhere.

### Docker Digital Ocean Server
I just logged into my Digital Ocean account and created a new micro droplet selecting docker from the applications tab and checking the box to have it given my previously uploaded public ssh key.

50 seconds later when the box was ready, I ssh'd onto it (from my host machine) and confirmed the `docker` command was available.

In order to get my application image from my boot2docker host on my mac to the server, I chose to run my own private docker registry. Conveniently and unsurprisingly docker have created an image to make this easy. All I had to do was run `docker run -d -p 5000:5000 --name docker-registry registry` on the Digital Ocean server which pulled down the image, daemonized it, exposed the relevant port giving it an appropriate alias. There are lots of options available when running the `registry` container which you can read through on its github page, but the default options are initially sufficient, storing images on local disk.

###  Pushing Image to our Private Registry
At this point my containerised application only lived on my boot2docker local instance, so I needed to push it up to my private registry. However, I couldn't do this immediately as my private registry container was only available when ssh'd onto my docker droplet. The solution I used to solve this was to set up a temporary ssh port forward from my boot2docker machine to my docker server. In order to do this I needed to append my boot2docker public ssh key to the docker server's ~/.ssh/authorized_keys file. Then in a boot2docker terminal I ran `ssh -N -L 5000:localhost5000 root@mydockerserver.example.com` this is a blocking command which is fine as I only needed the forward open briefly and its easy to tear down with a simple ctrl+c. Now in my original boot2docker terminal I simply pushed to localhost:5000 which ssh forwarded to my docker droplet where my registry was running on port 5000 `docker push localhost:5000/node-blog`. For some reason I found I sometimes need to run this several times as sometimes there is an occasional error uploading one of the layers. I'm not sure why.

### Running the dockerized site
My blog's image was now uploaded to my private registry on my Digital Ocean docker server. In order to test this I ssh'd onto that machine and ran `docker run -ti -p -rm 3000:3000 localhost:5000/node-blog` again and saw docker pulling the image out of the local private docker registry. Once done, I opened another terminal ssh'd onto the docker box and curled localhost:3000 to check it was running.

Now to make the application accessible outside. For this I found a really neat project which was again conveniently dockerized. The [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy)image contains an nginx instance which is setup to automatically reverse proxy any docker images running with appropriate environment variables. I ran this using `docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock --name reverseproxy jwilder/nginx-proxy` which runs the image as a daemonized service, bound to port 80 with the host machine docker.sock mounted into it so that the host's running containers are enumerable from within the proxy container.

With this setup, I could now start my site with an additional environment variable which signals nginx-proxy to proxy it. `docker run -d -p 3000:3000 -e "VIRTUAL_HOST=blog.juilanhaeger.com" localhost:5000/node-blog --name blog`. After setting up a dns record to point to my Digital Ocean server I was now able to view the site from the internet. Since you're reading this, it looks like it's still working! (Note that its not a great idea to rely on running a site in production just using straight node without upstart or something dealing with any crashes)

With this setup I can now deploy several dockerized applications with relative ease and have them accessible on their own domain names.

(I may have misremembered / mistyped some of the commands in this post so please submit any corrections you may find)

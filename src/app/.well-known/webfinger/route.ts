import { notFound } from 'next/navigation'
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url"

const julianWebFingerResult = {
  aliases: ["https://julianhaeger.com/ap/u/julian"],
  links: [{
    href: "https://julianhaeger.com/ap/u/julian",
    rel: "self",
    type: "application/activity+json"
  }]
}

export async function GET(request: Request){
  const query = parseUrl(request.url).query
  const resource = query.resource

  if(resource === undefined || Array.isArray(resource)){
    notFound()
  }
  
  if(!resource.startsWith('acct:')){
    notFound()
  }
  const account = resource.split(':')[1]
  if (account !== 'julian@julianhaeger.com'){
    notFound()
  }
  return Response.json(julianWebFingerResult)
}

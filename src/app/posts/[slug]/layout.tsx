import { PropsWithChildren } from "react";
import '../../tokyo-night-dark.css'

export default function BlogPostLayout(props: PropsWithChildren<{}>) {
  return <>{props.children}</>
}

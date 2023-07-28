import React, { useState } from "react";
import Appbar from "../components/Appbar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { trpc } from "../client";
import type { RouterOutputs } from "../server/api";

export default function AppMainScreen(props: {
  builder?: (props: {
    posts: RouterOutputs['getPostsOfCurrentUser'] | undefined
  }) => React.ReactNode,
  title: string
  action?: React.ReactNode
}) {

  const { data: posts } = trpc.getPostsOfCurrentUser.useQuery()

  return <div>
    <Appbar title={props.title} action={props.action} />
    <div className="container">
      {props.builder && React.createElement(props.builder, {
        posts
      })}
    </div>
    <BottomNavigationBar />
  </div>
}
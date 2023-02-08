import { useStorage } from "@plasmohq/storage/hook"
import React, { ReactNode } from "react"

function IndexOptions() {
  const [inputs, setInputs] = useStorage<ReactNode[]>("page-inputs", []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
    </div>
  )
}

export default IndexOptions
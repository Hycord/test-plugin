import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"
import { getPort } from "@plasmohq/messaging/port"


export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],

}


import styleText from "data-text:./style.css"
import type { PlasmoGetStyle } from "plasmo"
import { useState } from "react"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const storage = new Storage()

// window.addEventListener("load", () => {


//   const devWindow = document.createElement("div");
//   // devWindow.style.position = "fixed";
//   // devWindow.style.bottom = "0";
//   // devWindow.style.width = "100vw";
//   // devWindow.style.backgroundColor = "white";
//   // devWindow.style.padding = "10px";
//   // devWindow.style.boxSizing = "border-box";
//   // devWindow.style.borderTop = "1px solid black";
//   // devWindow.style.display = "flex";
//   // devWindow.style.justifyContent = "space-between";
//   // devWindow.style.alignItems = "center";
//   devWindow.className = "rounded-md fixed bottom-0 w-full bg-white p-2 border-t-2 border-black flex justify-between items-center";

//   devWindow.innerHTML = `
//     <div>
//       <button id="save">Save</button>
//       <button id="load">Load</button>
//       </div>`

//   document.querySelector("body").appendChild(devWindow)

const inputs = document.querySelectorAll("input");

const serializableInputs = [];
const Is = [];
chrome.runtime.onMessage.addListener((message) => {
  console.log(message)

  const { id, content } = message;

  const input = Is.find((input) => input.id === id);

  console.table({ id, content })
  input.input.value = content;
})

inputs.forEach(async (input: HTMLInputElement) => {

  // if (!input.isContentEditable) return;
  const { name, value, placeholder, type } = input;
  if (type != "text") return;
  const id = crypto.randomUUID();
  const data = {
    name,
    value,
    placeholder,
    id,
    tabId: window.location.href
  }
  console.table(data)
  serializableInputs.push({ ...data });
  Is.push({ ...data, input });
})
storage.set("page-inputs", serializableInputs);



// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message)
//   i[message.id].value = message.content;
// })


const ContentScript = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);



  return expanded ? <div className="p-4 fixed bottom-0 right-0 w-full h-12 bg-slate-900 border-slate-700 text-slate-500 rounded-l-sm cursor-pointer">
    <button className="rounded-sm border-slate-500 border-solid" onClick={() => setExpanded(false)}>Close menu</button>
  </div> : <div className="p-4 fixed bottom-0 right-0 h-12 bg-slate-900 border-slate-700 text-slate-500 rounded-l-sm cursor-pointer" onClick={() => setExpanded(true)}>
    {"<"}
  </div>


}
export default ContentScript;
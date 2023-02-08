import { useStorage } from "@plasmohq/storage/hook";
import React from "react";
import "./style.css";

import { usePort } from "@plasmohq/messaging/hook"

function IndexPopup() {

  const inputPort = usePort('input')
  const [inputs, setInputs] = useStorage<{
    name?: string;
    value?: string;
    placeholder?: string;
    id: string;
    tabId: string;
  }[]>(`page-inputs`, []);

  const getCurrentTab = async () => (await  chrome.tabs.query({ active: true, currentWindow: true }))?.[0] ?? null

  const sendInputMessage = async (content: string, inputId: string) => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { content, id: inputId })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, id } = e.target;
    sendInputMessage(value, id);
  }

  return (
    <>
    {/* {inputs.length} */}
      {/* {JSON.stringify(inputs) ?? {}} */}
      {
        inputs.filter(async filteredItem => {
          if(!window) return;
          return filteredItem.tabId === window.location.href;
        }).map((i, b) => {
          return <input key={b} type="text" id={i.id} name={i?.name} placeholder={i?.placeholder} defaultValue={i.value} onChange={handleInputChange} />;
        })
      }

      

      
    </>
  )
}

export default IndexPopup

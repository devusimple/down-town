import { useEffect, useState } from "react"

export default function App() {
  const [url, setUrl] = useState("");
  const [res, setRes] = useState("")


  const getInfo = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`https://down-town-sever.vercel.app/download?url=${url}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    setRes(data)
    console.log(data);
  }



  return (
    <div className="w-full h-screen grid place-content-center space-y-2">
      <div className="w-full max-w-md space-y-2">

        <textarea onChange={(e) => setUrl(e.target.value)} placeholder="Paste your url" className="p-2 bg-neutral-200 outline-none w-full resize-none" />
        <button onClick={() => getInfo()} className="px-6 py-2 w-full bg-indigo-200">Get</button>
        <pre className="bg-black p-2 text-white">
          <code>
            {res}
          </code>
        </pre>
      </div>
    </div>
  )
}

// https://down-town-sever.vercel.app/
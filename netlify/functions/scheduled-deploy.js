import fetch from "node-fetch"
import { schedule } from '@netlify/functions'
const BUILD_HOOK = "https://api.netlify.com/build_hooks/6371e615528c7870cd4659e3";

export const handler = schedule("0 0 * * *", async () => {
    await fetch(BUILD_HOOK, {
        method: "POST"
    }).then(response => {
        console.log("Build hook response:", response)
    })
    
    return {
        statusCode: 200
    }
})
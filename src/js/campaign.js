import { setCampaign } from "./func/campaign.js";
const sendCampaign=document.querySelector("#send-campaign")
sendCampaign.addEventListener("click",(event)=>{
    event.preventDefault()
    setCampaign()
})
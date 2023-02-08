import type { PlasmoMessaging } from "@plasmohq/messaging"
 
const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log(req)
 
  res.send({
    id: req.body.id,
    content: req.body.content,
  })
}
 
export default handler
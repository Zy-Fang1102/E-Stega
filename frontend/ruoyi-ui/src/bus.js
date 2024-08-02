import mitt from 'mitt';
 
// type Events = {
//   sendMsg: string
//   sendMsg1: string
//   sendNum: number
//   sendRes: string[]
//   sendHis: string[]
// }
 
// const bus = mitt<Events>()
const bus = mitt();
export default bus;
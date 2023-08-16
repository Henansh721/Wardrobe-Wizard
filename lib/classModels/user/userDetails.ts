import { LocationDetails } from "../location/locationDetail";
import { ProductOrderDetails } from "../order/orderDetails";

export class UserDetails {
  user_Id: string = "";
  user_Name: string = "";
  user_Email_Id: string = "";
  user_Gender: string = "";
  user_Mobile_Number: number = 0;
  user_Age: number = 0;
  user_Address: LocationDetails = new LocationDetails();
  order_History_List: ProductOrderDetails[] = [];

  //////////////////////////// GPT Generated ////////////////////////////
  user_Body_Type: any = {
    user_Shape: "",
    user_Proportions: "",
    user_Compositions: "",
    user_Physique: "",
  };
  user_Body_Shape: any = {
    user_upper_Dimension: 0,
    user_middle_Dimension: 0,
    user_lower_Dimension: 0,
    measure_scale: "",
  };
  user_Style_Tags_List: string[] = [];
  user_Style_Colors_List: string[] = [];
  user_Prompts_List: any[] = [];
  user_Prompts_Old_List: any[] = [];
  user_Purchase_Brand_Name_Map: any = {};
  user_Style_Colors_Map: any = {};

  constructor() {}
}


// {globalChatList.map((chat: string, index: number) => {
//   if (globalChatList.length % 2 === 0) {
//     if (index % 2 == 0) {
//       return (
//         <div
//           key={index}
//           className="relative flex flex-row w-full mt-3"
//         >
//           <div className="relative flex flex-row max-w-[85%] space-x-[1px]">
//             <div
//               className={`relative bg-blue-700 h-5 w-5 rounded-full p-3 top-0 left-0`}
//             >
//               <Image
//                 alt="img"
//                 src={"/wizzard.png"}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//             <div className="rounded-r-full rounded-bl-full overflow-hidden bg-[#27293e] text-white">
//               <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
//                 {globalChatList[globalChatList.length - index - 1]}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div
//           key={index}
//           className="relative flex flex-row-reverse w-full mt-3"
//         >
//           <div className="relative flex flex-row max-w-[85%] space-x-[1px]">
//             <div className="rounded-l-full rounded-br-full overflow-hidden bg-blue-700 text-white">
//               <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
//                 {globalChatList[globalChatList.length - index - 1]}
//               </div>
//             </div>
//             {/* <div
//               className={`relative bg-[#27293e] h-5 w-5 p-3 rounded-full top-0 right-0`}
//             >
//               <Image
//                 alt="img"
//                 className={`rounded-full`}
//                 src={"/user-icon.png"}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div> */}
//           </div>
//         </div>
//       );
//     }
//   } else {
//     if (index % 2 == 0) {
//       return (
//         <div
//           key={index}
//           className="relative flex flex-row-reverse w-full mt-3"
//         >
//           <div className="relative flex flex-row max-w-[85%] space-x-[1px]">
//             <div className="rounded-l-full rounded-br-full overflow-hidden bg-blue-700 text-white">
//               <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
//                 {globalChatList[globalChatList.length - index - 1]}
//               </div>
//             </div>
//             {/* <div
//               className={`relative bg-[#27293e] h-5 w-5 p-3 rounded-full top-0 right-0`}
//             >
//               <Image
//                 alt="img"
//                 className={`rounded-full`}
//                 src={"/user-icon.png"}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div> */}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div
//           key={index}
//           className="relative flex flex-row w-full mt-3"
//         >
//           <div className="relative flex flex-row max-w-[85%] space-x-[1px]">
//             <div
//               className={`relative bg-blue-700 h-5 w-5 rounded-full p-3 top-0 left-0`}
//             >
//               <Image
//                 alt="img"
//                 src={"/wizzard.png"}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//             <div className="rounded-r-full rounded-bl-full overflow-hidden bg-[#27293e] text-white">
//               <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
//                 {globalChatList[globalChatList.length - index - 1]}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// })}
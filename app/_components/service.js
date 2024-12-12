

import axios from "axios";
const API_Base_URl = " https://672a42b1976a834dd022c092.mockapi.io";
const api = axios.create({API_Base_URl,})

export const getSong=async(id)=>{
    try {

        
        let Song_id_URl  ="https://api.jamendo.com/v3.0/tracks/?client_id=5c19d8f2&format=jsonpretty&limit=2&audioformat=mp31&speed=high+veryhigh&include=musicinfo&groupby=artist_id&id="+id;
        const response = await fetch(Song_id_URl)
        let data =  await response.json()
         return data.results[0]
        // console.log(data.results[0])
        
    } catch (error) {
       throw error
        
    }
};

export const getPlayLists = async () => {
    try {
                const response = await fetch("https://672a42b1976a834dd022c092.mockapi.io/playLists");
                let data =  await response.json()
                // return data = response.data
                console.log(data)
                
                return data.results
               
            } catch (error) {
               throw  id +error
                
            }
}
export const addToPlayList = async (params) => {
    
}

// export const getPostsID=async(id)=>{
//     try {
//         const response = await api.get('/tasks/'+id);
//         return response.data
        
//     } catch (error) {
//        throw  id +error
        
//     }
// };

// export const deletePostApi=async(id)=>{
//     try {
//         const response = await api.delete('/tasks/'+id);
//         return response.data
        
//     } catch (error) {
//        throw error
        
//     }
// }




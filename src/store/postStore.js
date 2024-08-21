import { atom,   } from 'recoil'

export const PostStore = atom({
    key: 'PostStore',
    default: [],
})


// this function will be used where this recoil value will be used
// const createPost = (post) => {
//     setPost([post,...posts])
// }


// export const CreatePost = selector({
//     default: 'CreatePost',
//     get:({get})
// })


// export const deletePost = selector({
//     key: 'deletePost',
//     get:  ({ get }) => { 
//         const posts = get(PostStore)
//         function deletePost(id) {
//             const newPosts = posts.filter(post => post.id !== id)
//             return newPosts;
//         }
//         deletePost()
//     }
// })
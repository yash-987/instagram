import { atom, selector } from 'recoil'

export const PostStore = atom({
    key: 'PostStore',
    default: [],
})


// this function will be used where this recoil value will be used
// const createPost = (post) => {
//     setPost({
//       posts:[post,...posts]
//     })
// }


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
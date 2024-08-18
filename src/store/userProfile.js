
import { atom, useRecoilState, useRecoilValue,  } from 'recoil'
import { PostStore } from './postStore'

// we're storing userprofile in the global state because we need to use it in multiple components
export const UserProfile = atom({
    key: 'UserProfile',
    default: null
})


export const AddPost = (post) => {
    const [userprofile, setUserProfile] = useRecoilState(UserProfile)
    const posts = useRecoilValue(PostStore)
    console.log(posts)
    setUserProfile({
        ...userprofile,
        posts:[post.id,...posts]
    })
}


// function which i will store in different file
// const addPost = (post) =>{
//     // UserProfile: {...UserProfile, posts: [post.id, ...UserProfile.posts] }
//     // use above if below doesn't work

//     setUserProfile({
//         ...UserProfile,
//         posts:[post.id,...UserProfile.posts]
//     })
// }
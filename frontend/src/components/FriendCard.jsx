import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({friend}) => {

  return <div className="card bg-base-200 hover:shadow-md transition-shadow">

    <div className="card-body p-4">

        {/* User info */}
        <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12">
                <img src={friend.profilePic} alt={friend.fullName} />
            </div>
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>
        {/* Language */}
        <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="badge badge-secondary text-xs">
                {getLanguageflag(friend.nativeLanguage)}
                Native: {friend.nativeLanguage}
            </span>
            <span>
                {getLanguageflag(friend.learningLanguage)}
                Learning: {friend.learningLanguage}
            </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
            Message
        </Link>
    </div>
  </div>
}
export default FriendCard

export function getLanguageflag(language) {
    if(!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if(countryCode){
        return (
            <img 
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${language} flag`}
                className="h-3 mr-1 inline-block"
            />
        )
    }
}
import UserAvatar from "../postForm/UserAvatar";
import Dropdown from "../post/Dropdown";
import UserInfo from "../post/UserInfo";
import Content from "../post/Content";
import Buttons from "../post/Buttons";

const Post = ({ tweet }) => {
  return (
    <div className="border-b border-tw-gray p-4 flex gap-2">
      <UserAvatar photo={tweet.user.photo} />
      <div className="w-full">
        <div className="flex justify-between">
          <UserInfo tweet={tweet} />
          <Dropdown tweet={tweet} />
        </div>
        <Content data={tweet.content} />
        <Buttons tweet={tweet} />
      </div>
    </div>
  );
};

export default Post;

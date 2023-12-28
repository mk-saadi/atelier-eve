import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContent = ({ content }) => {
	return (
		<div className="relative">
			<ReactMarkdown
				className="text-base font-medium prose text-gray-700 break-words whitespace-pre-line markdown md:text-base"
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default PostContent;

import { useState } from "react";
import "./Form.css";
import axios from "axios";

type FormProps = {
  onSubmit: (id: string, name: string, likes: number, content: string, retweet: number) => void;
};

type FormData = {
    userid: string;
    name: string;
    times: string;
    likes: number;
    retweet: number;
    content: string;
    reply_to: string;
};

const PostForm = () => {
  const [name, setName] = useState("a");
  // const [id, setAge] = useState("@aaa");
  const [userid, setUseid] = useState("@aaa");
  const [likes, setLikes] = useState(0);
  const [content, setContent] = useState("");
  const [retweet, setRetweet] = useState(0);
  const [reply_to, setReply_to] = useState("23");
  

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(userid, name, likes, retweet, content, reply_to);
  };

  return (
    <form className="forms" onSubmit={submit}>
      <div className="form">
        <label>Content: </label>
        <input 
          type={"text"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </div>
      <button className="post" type={"submit"}>POST</button>
    </form>
  );
};


const handleSubmit = async (userid: string, name: string, likes: number, retweet: number, content: string, reply_to: string) => {
    if (!content) {
      alert("Please enter content");
      return;
    }

    const formdata: FormData = {
      userid: userid,
      name: name,
      times: new Date().toISOString(),
      likes: likes,
      retweet: retweet,
      content: content,
      reply_to: reply_to,
    };

    try {
      const response = await axios.post('https://hackathon-backend4-375247885230.us-central1.run.app/posts', formdata);
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to post data', error);
    }
    console.log('Form data:', formdata);
  };

export default PostForm;
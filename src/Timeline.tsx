import React from 'react';
import './Timeline.css';
import { useState, useEffect} from "react";
import axios from "axios";

interface TweetProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

type User = {
  id: number;
  name: string;
  age: number; 
}



type FormData = {
  name: string;
  age: number;
}

interface Tweet {
  id: number;
  userid: string;
  name: string;
  times: string;
  likes: number;
  retweet: number;
  content: string;
}

type CL = {
  id: number;
  userid: string;
}






// const Timeline: React.FC<TweetProps> = ({ user, content, timestamp }) => {
//   const formattedTimestamp = new Intl.DateTimeFormat('ja-JP', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//   }).format(timestamp);

const Timeline = () => {
  const getTweet = async () => {
    try {
      const response = await fetch('https://hackathon-backend4-375247885230.us-central1.run.app/posts');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users, status: ${response.status}`);
      }
  
      const tweets = await response.json() as Tweet[];
      return tweets;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  const [users, setUsers] = useState<User[]>([]);
  const [tweets, setTweet] = useState<Tweet[]>([]);
  const update = async () => {
    const tweets = await getTweet();
    if (tweets === undefined) {
      return;
    }
    setTweet(tweets);
  }
  useEffect(() => {
    update();
  }, []);

  const formattedTimestamp = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  // let tweets: TweetProps[] = [];
  //   tweets.push({
  //       user: {
  //       name: 'Alice',
  //       handle: 'alice',
  //       avatar: 'https://placekitten.com/200/200',
  //       },
  //       content: 'Hello, world!',
  //       timestamp: new Date(),
  //   });

  //   tweets.push({
  //       user: {
  //       name: 'Bob',
  //       handle: 'bob',
  //       avatar: 'https://placekitten.com/200/200',
  //       },
  //       content: 'This is my first tweet.',
  //       timestamp: new Date(),
  //   });

    // let tweets2: Tweet[] = tweets.map(() => {
    //   return {
    //     userid: user.userid,
    //     name: user.name,
    //     times: s,
    //     likes: number;
    //     retweet: number;
    //     content: string;
    //   };
    // });

  const submit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> , id: number, userid: string) => {
    e.preventDefault();
    handleSubmit(id, userid);
  };


  return (
    <div className="tweets">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          {/* <img src={tweet.user.avatar} /> */}
          <div className="content">
            <div className="user-info">
              <strong>{tweet.name}</strong> {tweet.userid}
            </div>
            <div className="timestamp">{tweet.times}</div>
            <div className="message">{tweet.content}</div>
            <div className="likes">
              ❤️ {tweet.likes} 🔁 {tweet.retweet}
              <button onClick={(e) => submit(e, tweet.id, tweet.userid)}>❤️</button>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default Timeline;

const handleSubmit = async (id:number, userid: string) => {

  const formdata: CL = {
    id: id,
    userid: userid,
  };

  try {
    const response = await axios.post('https://hackathon-backend4-375247885230.us-central1.run.app/likes', formdata);
    console.log('Response:', response);
  } catch (error) {
    console.error('Failed to post data', error);
  }
  console.log('Form data:', formdata);
};

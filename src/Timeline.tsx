import React from 'react';
import './Timeline.css';

interface TweetProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
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
  const formattedTimestamp = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  let tweets: TweetProps[] = [];
    tweets.push({
        user: {
        name: 'Alice',
        handle: 'alice',
        avatar: 'https://placekitten.com/200/200',
        },
        content: 'Hello, world!',
        timestamp: new Date(),
    });

    tweets.push({
        user: {
        name: 'Bob',
        handle: 'bob',
        avatar: 'https://placekitten.com/200/200',
        },
        content: 'This is my first tweet.',
        timestamp: new Date(),
    });


  return (
    <div className="tweets">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          <img src={tweet.user.avatar} />
          <div className="content">
            <div className="user-info">
              <strong>{tweet.user.name}</strong> @{tweet.user.handle}
            </div>
            <div className="timestamp">{formattedTimestamp}</div>
            <div className="message">{tweet.content}</div>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default Timeline;



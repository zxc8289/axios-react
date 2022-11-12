import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [post, setPost] = useState();
  const [postId, setPostid] = useState(1);

  const test = useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://f60520b0-fb31-4253-9a03-4bec5ab61027.mock.pstmn.io/posts/${postId}`
      )
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          setPost(response.data);
        } else {
          alert("잘못된 데이터입니다.");
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 404) {
          alert("페이지가 없습니다.");
        } else {
          alert("문제가 발생하였습니다. 개발자에게 연락주세요.");
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("무조건 실행됨");
      });
  }, [postId]);

  useEffect(() => {
    test();
  }, [postId]);

  const mButton = () => {
    if (postId > 1) {
      setPostid(postId - 1);
    }
  };

  const aButton = () => {
    if (postId <= post.page) {
      setPostid(postId + 1);
    }
  };
  return (
    <div>
      {isLoading || post == null ? (
        <div>로딩 중...</div>
      ) : (
        <Card style={{ width: "80rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>userId : {post.userId}</ListGroup.Item>
            <ListGroup.Item>id : {post.id}</ListGroup.Item>
            <ListGroup.Item>{post.title}</ListGroup.Item>
            <ListGroup.Item>{post.body}</ListGroup.Item>
            <ListGroup.Item>page : {post.page}</ListGroup.Item>
            <ListGroup.Item>
              {post.comments.map((item, index) => (
                <Card style={{ width: "100%" }} key={index}>
                  <Card.Header>{item.email}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{item.body}</ListGroup.Item>
                  </ListGroup>
                </Card>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}

      <button onClick={mButton} disabled={isLoading}>
        {isLoading ? (
          <div>
            <Spinner animation="border" size="sm" />
            로딩 중...
          </div>
        ) : (
          "이전글 보기"
        )}
      </button>
      <button onClick={aButton} disabled={isLoading}>
        {isLoading ? (
          <div>
            <Spinner animation="border" size="sm" />
            로딩 중...
          </div>
        ) : (
          "다음글 보기"
        )}
      </button>
      {/* <button onClick={() => setPostid((prev) => prev - 1)}>이전글</button>
      <button onClick={() => setPostid((prev) => prev + 1)}>다음글</button> */}
    </div>
  );
};

export default App;

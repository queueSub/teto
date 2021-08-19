import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LikeButton from "components/Common/LikeButton";
import {
  ResultContainer,
  ResultPageContainer,
  ShareForm,
} from "./BingoResultPage.styles";
import { ReactComponent as CopyImg } from "assets/copy.svg";
import { PALLETE } from "constants/pallete";
import CommentSection from "components/Common/CommentSection/CommentSection";
import useBingo from "hooks/useBingo";

function SurveyResultPage({ location }) {
  const userObj = useSelector((state) => state.user.userData);
  const history = useHistory();
  const testURL = useRef();
  if (!location.state) {
    alert("잘못된 경로입니다.");
    history.push("/");
    location = {
      state: { result: null, testId: null },
    };
  }
  const {
    state: { result, testId },
  } = location;
  console.log(userObj, testId, result);
  const { bingo } = useBingo(testId);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ResultPageContainer>
      {result && bingo && userObj && (
        <>
          <ResultContainer>
            <h1>Result</h1>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
            <LikeButton
              initialLikes={bingo.likes}
              userObj={userObj}
              testId={testId}
              testType={"bingo"}
            />
            <br />
            <Link to="/bingo">다른 테스트하러 가기</Link>
            <span>이 테스트 공유하기</span>
            {testId && (
              <ShareForm>
                <input
                  ref={testURL}
                  focu
                  value={`https://teto-test-together.herokuapp.com/bingo/${testId}`}
                />
                <CopyImg
                  width={28}
                  height={28}
                  fill={PALLETE.PRIMARY_BLUE_DARK}
                  onClick={() => {
                    if (testURL.current) {
                      testURL.current.select();
                      document.execCommand("copy");
                    }
                  }}
                >
                  공유
                </CopyImg>
              </ShareForm>
            )}
          </ResultContainer>
          <CommentSection userObj={userObj} testId={testId} />
        </>
      )}
    </ResultPageContainer>
  );
}

export default SurveyResultPage;

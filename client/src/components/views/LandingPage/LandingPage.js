import React, { useEffect, useState } from "react";
import surveyAPI from "api/surveys";
//history는 react-router-dom을 이용해서 사용하는 것
//HOC를 거쳐도 history.push를 사용할 수 있도록 import
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  PopularSurveyList,
  TestLinkItem,
} from "./LandingPage.styles";
import LikeInfo from "components/Common/LikeInfo";

function LandingPage({ userObj }) {
  const [surveyList, setSurveyList] = useState([]);
  useEffect(() => {
    surveyAPI
      .getPopularSurveys(1)
      .then((surveys) => setSurveyList(surveyList.concat(surveys)));
  }, []);
  return (
    <Container>
      <PopularSurveyList>
        <h3>인기 테스트</h3>
        {surveyList.length > 0 &&
          surveyList.map((survey) => (
            <TestLinkItem key={survey._id} to={`/survey/${survey._id}`}>
              <span className="survey_title">{survey.title}</span>
              <LikeInfo likes={survey.likes} />
            </TestLinkItem>
          ))}
      </PopularSurveyList>
    </Container>
  );
}

export default withRouter(LandingPage);

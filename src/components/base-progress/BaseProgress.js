import React from 'react';
import styled,{css} from "styled-components";
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StyledBaseProgress = styled.div`
  width: 64px;
  height: 64px;
  font-size: 16px;
  font-weight: 500;
`;
const BaseProgress = ({percentage=50}) => {
    return (
        <StyledBaseProgress>
        <CircularProgressbar value={percentage} text={`${percentage}%`}   styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: `#0085FF`,
            textColor: '#0085FF',
            trailColor: '#E6F3FF',
            backgroundColor: '#0085FF',
        })}/>
        </StyledBaseProgress>
    );
};

export default BaseProgress;

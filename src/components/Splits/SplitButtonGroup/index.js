import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { ButtonGroupWrapper, TabButton } from "./styles";

export default function SplitButtonGroup({
  splits,
  activeSplit,
  onSplitChange,
}) {
  useEffect(
    () => onSplitChange(splits && splits[0] ? splits[0]._id : null),
    [splits]
  );

  return (
    <ButtonGroupWrapper>
      {splits ? (
        splits.map((s) => (
          <TabButton
            className="tab-button"
            onClick={() => onSplitChange(s._id)}
            active={activeSplit === s._id}
          >
            {s.tab_name}
          </TabButton>
        ))
      ) : (
        <>
          <Skeleton.Button active={true} shape="round" />
          <Skeleton.Button active={true} shape="round" />
          <Skeleton.Button active={true} shape="round" />
        </>
      )}
    </ButtonGroupWrapper>
  );
}

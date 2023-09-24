import React from "react";

const ListPagenation = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  page: number;
  setPage: Function;
  blockNum: number;
  setBlockNum: Function;
  counts: number;
}): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  };

  const pageLimit = 5;

  const totalPage: number = Math.ceil(counts / limit);

  const blockArea: number = Number(blockNum * pageLimit);
  const nArr = createArr(Number(totalPage));
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea);

  return (
    <div className="ListPagenationWrapper">
      <div className="pageBtnWrapper">
        {pArr.map((n: number) => (
          <button
            className="pageBtn"
            key={n}
            onClick={() => {
              setPage(n);
            }}
            aria-current={page === n ? "page" : undefined}
          >
            {n}
          </button>
        ))}
      </div>
      <style>
        {`
          .ListPagenationWrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 37px;
            margin-bottom:100px;
          }

          .pageBtn {
            width: 30px;
            height: 30px;
            margin: 0 10px;
            border: none;
            color: black;
            font-size: 20px;
            line-height:5px;
            opacity: 0.2;
            &:hover {
              background-color: #e2e2e2;
              cursor: pointer;
              color:black;
              opacity:0.4;
              border-radius:10px;
              transform: translateY(-2px);
            }

            &[disbled] {
              cursor: revert;
              transform: revert;
              background-color: white;
            }

            &[aria-current] {
              background-color: white;
              font-weight: bold;
              cursor: revert;
              transform: revert;
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ListPagenation;

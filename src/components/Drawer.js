import React, { useRef } from "react";
import SortAlgos from "../SortAlgo";
import Button from "./Button";
import Slider from "./Slider";
import ToggleSwitch from "./ToggleSwitch";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../hook/useClickOutside";
import "../Transition.css";

export default function Drawer({
  arrayLength,
  handleArrayLength,
  sortSpeed,
  handleSortSpeed,
  randomArr,
  sortAlgo,
  setSortAlgo,
  handleSort,
  isAsc,
  handleToggleAsc,
  isDisabled,
  isShowDrawer,
  setIsShowDrawer,
}) {
  //detect click/tap outside drawer
  const drawerRef = useRef();
  useClickOutside(drawerRef, setIsShowDrawer);

  return (
    <CSSTransition
      in={isShowDrawer}
      timeout={300}
      classNames="enter-left"
      unmountOnExit
    >
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 bg-gray-700/95 backdrop-blur-md h-full w-72 flex md:hidden items-start justify-center shadow-drawer z-20 "
      >
        <button onClick={() => setIsShowDrawer(false)} className="">
          <span className="material-icons text-white text-3xl rounded-full px-1 absolute right-6 top-10  bg-blue-400/50 hover:bg-blue-400 focus:bg-blue-400 transition ease-in">
            chevron_{isShowDrawer ? "right" : "left"}
          </span>
        </button>

        <div className="flex flex-col items-center gap-y-6 mt-[120px] px-8 text-white">
          <h1 className="font-bold w-full text-xl">SORT ALGORITHM</h1>

          <select
            onChange={(e) => setSortAlgo(e.target.value)}
            disabled={isDisabled}
            value={sortAlgo}
            className="bg-transparent font-semibold focus:ring-0 focus:outline-none w-full text-center"
          >
            {SortAlgos.map(([{ id, name, value }]) => (
              <option
                key={id}
                className="bg-transparent text-gray-400 font-semibold rounded-full"
                value={value}
              >
                {name}
              </option>
            ))}
          </select>

          <Slider
            name="arrayLength"
            nameHeader="Array Length"
            minValue="10"
            maxValue="150"
            leftValueText="10"
            rightValueText="150"
            value={arrayLength}
            valuePlaceHolder={arrayLength}
            step="1"
            handleOnChange={handleArrayLength}
            disabled={isDisabled}
          />
          <Slider
            name="sortSpeed"
            nameHeader="Sort Speed"
            minValue="10"
            maxValue="500"
            leftValueText="Slow"
            rightValueText="Fast"
            value={Math.abs(sortSpeed - 500) + 10}
            step="1"
            handleOnChange={handleSortSpeed}
            disabled={isDisabled}
          />
          <ToggleSwitch
            isAsc={isAsc}
            handleToggleAsc={handleToggleAsc}
            isDisabled={isDisabled}
          />
          <Button
            placeHolder="Random Array"
            handleOnClick={randomArr}
            disabled={isDisabled}
          />
          <Button
            placeHolder="Sort"
            handleOnClick={() => {
              handleSort();
              setIsShowDrawer(false);
            }}
            disabled={isDisabled}
          />
        </div>
      </div>
    </CSSTransition>
  );
}
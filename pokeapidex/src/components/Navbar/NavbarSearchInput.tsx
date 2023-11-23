import { IoSearchCircle } from "react-icons/io5";
import { useCallback, useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/hooks";
import { setPokemonDataToInitial } from "@/slices/pokemonDataSlice";
import { setCounterReset } from "@/slices/counterSlice";
import { setSearchingValue } from "@/slices/isSearchingSlice";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarSearchInput = () => {
  const dispatch = useAppDispatch();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const inputValueRef = useRef<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const delay = 1000;
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  const handleSearchChange = useCallback(() => {
    const latestInputValue = inputValueRef.current;
    dispatch(setPokemonDataToInitial());
    dispatch(setCounterReset());
    dispatch(setSearchingValue(latestInputValue));
  }, [dispatch]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const newValue = event.target.value;
    inputValueRef.current = newValue;
    if (location.pathname === "/") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        handleSearchChange();
      }, delay);
      setTimeoutId(newTimeoutId);
    } else dispatch(setSearchingValue(inputValueRef.current));
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (location.pathname == "/pokemon" && event.key === "Enter") {
      navigate("/");
      handleSearchChange();
    }
  };

  return (
    <label htmlFor="search-input" className="search-input-label">
      <input
        name="search-input"
        className="navbar-search-input"
        type="text"
        placeholder="Type a pokemon name..."
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {inputValueRef.current.length === 0 ? (
        <IoSearchCircle className="search-input-icon" />
      ) : (
        <></>
      )}
    </label>
  );
};

export default NavbarSearchInput;

// src/store/hooks.ts
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store/rootReducer.tsx";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { FormEvent } from "react";
import { Position } from "../../types/types";

export interface SideBarProps {
    setTargetPosition: (callback: (prev: Position) => Position) => void
    setDuration: (time: number) => void;
    simulate: (event: FormEvent) => void;
    resetSimulation: () => void
}

import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

describe("useVisualMode", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    expect(result.current.mode).toBe(FIRST);
  });

  it("should transition to another mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  });

  it("should return to previous mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  it("should not return to previous mode if already at initial", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  it("should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    act(() => result.current.transition(THIRD, true));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });
});
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { Icon } from "@growth-ui/react";

export default function ArrowUp() {
  const ArrowBtn = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    font-size: 50px;
    background-color: #F6F6F6;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;

    ${({ theme }) => theme.gui.media.mobile} {
      right: 20px;
      bottom: 100px;
    }
  `;

  const ArrowIcon = styled(Icon)`
    position: relative;
    width: 50px;
    height: auto;
    color: #2D126D;
    transition: all 0.4s ease-in;

    &:hover {
      color: #F3C4CE;
    }
  `;

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 600;
    const _ref = ref.current;

    if (_ref && scrolled) {
      _ref.style.opacity = '1';
      _ref.style.pointerEvents = 'auto';
      _ref.style.cursor = 'pointer';
    } else if (_ref) {
      _ref.style.opacity = '0';
      _ref.style.pointerEvents = 'none';
    }
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
    <ArrowBtn ref={ref}>
      <ArrowIcon name={"chevron up"} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </ArrowBtn>
    </>
  )
}
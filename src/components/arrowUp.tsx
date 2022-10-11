import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

export default function ArrowUp() {
  const ArrowBtn = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    font-size: 50px;
    background-color: #F6F6F6;
    color: #2D126D;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s ease-in;

    &:hover {
      color: #F3C4CE;
    }

    ${({ theme }) => theme.gui.media.mobile} {
      right: 20px;
      bottom: 100px;
    }
  `;

  const ArrowIcon = styled.i`
    position: relative;
    bottom: 10px;
    left: 11px;
    font-size: 36px !important;
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
      <ArrowIcon className='fa-solid fa-arrow-up' aria-hidden='true' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </ArrowBtn>
    </>
  )
}
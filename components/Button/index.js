import { colors } from "../../styles/theme"

export default function Button({ disabled, children, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>

      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.quaternary};
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          display: flex;
          border-radius: 9999px;
          font-size: 18px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
        }

        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

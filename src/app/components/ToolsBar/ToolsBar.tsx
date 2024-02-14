import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import { DarkMode, GitHub } from '../svg'

const ToolsBar = () => {
  return (
    <div className="relative flex justify-end items-center py-4 text-white">
      <div className="px-6 py-2 bg-lime-600/80 dark:bg-lime-600/50 rounded-xl shadow-sm duration-300 flex flex-wrap">
        <a
          className="w-auto h-auto p-0 m-0 flex justify-center items-center hover:scale-95"
          title="Source code"
          href="https://www.github.com/di4m0nds/kaboard"
          target="_blank"
        >
          <GitHub className="w-5 h-5 text-white" />
        </a>

        <div className="w-1 mx-4 h-5 rounded-full bg-white/50" />

        <span
          className="w-auto h-auto p-0 m-0 flex justify-center items-center hover:scale-95"
          title="Theme Mode"
        >
          <ThemeSwitch />
        </span>
      </div>
    </div>
  )
}

export default ToolsBar

export default function SectionHeader({ eyebrow, title, children, action, center = false }) {
  return (
    <div className={`mb-8 flex flex-col gap-4 sm:mb-10 ${center ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
      <div className={`flex flex-col gap-2.5 ${center ? 'items-center' : ''}`}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="text-[28px] font-extrabold leading-tight sm:text-4xl lg:text-[44px]">{title}</h2>
        {children && <p className="max-w-xl text-muted">{children}</p>}
      </div>
      {action}
    </div>
  )
}

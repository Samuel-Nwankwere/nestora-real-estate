import { useId, useState } from 'react'
import { monthlyRepayment, naira } from '../data/listings'
import Segmented from './Segmented'

function Slider({ label, value, min, max, step, onChange, display }) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <label htmlFor={id} className="font-semibold">{label}</label>
        <span className="font-bold tabular-nums">{display}</span>
      </div>
      <input id={id} type="range" className="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} style={{ '--fill': `${fill}%` }} aria-valuetext={display} />
    </div>
  )
}

export default function MortgageCalculator({ initialPrice = 150_000_000, compact = false }) {
  const [price, setPrice] = useState(initialPrice)
  const [equity, setEquity] = useState(30)
  const [rate, setRate] = useState(18)
  const [years, setYears] = useState(20)
  const { loan, monthly } = monthlyRepayment(price, equity, rate, years)

  return (
    <div className={`flex flex-col gap-6 rounded-[26px] border border-line bg-white ${compact ? 'p-5' : 'p-5 shadow-[0_20px_50px_rgba(15,27,45,0.06)] sm:p-8'}`}>
      <Slider label="Home price" value={price} min={20_000_000} max={2_500_000_000} step={5_000_000} onChange={setPrice} display={naira(price)} />
      <Slider label="Equity contribution" value={equity} min={10} max={70} step={1} onChange={setEquity} display={`${equity}% · ${naira(price * equity / 100)}`} />
      <Slider label="Interest rate" value={rate} min={6} max={30} step={0.5} onChange={setRate} display={`${rate.toFixed(1)}%`} />
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold" id="term-label">Loan term</span>
        <Segmented label="Loan term" value={years} onChange={setYears} className="w-full"
          options={[10, 15, 20, 25].map((y) => ({ value: y, label: `${y} yrs` }))} />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-[18px] bg-ink p-5 text-white sm:px-6" aria-live="polite">
        <div>
          <p className="text-[13px] text-[#B7C3CF]">Estimated monthly repayment</p>
          <p className="font-display text-[32px] font-extrabold tracking-tight tabular-nums sm:text-[40px]">{naira(monthly)}</p>
        </div>
        <p className="text-right text-[13px] text-[#B7C3CF]">Loan amount<br /><strong className="text-[15px] text-white tabular-nums">{naira(loan)}</strong></p>
      </div>
      <p className="-mt-2 text-xs text-muted">Illustrative only. Actual rates and terms depend on your lender.</p>
    </div>
  )
}

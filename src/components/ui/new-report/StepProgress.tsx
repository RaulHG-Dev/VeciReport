import { cn } from '../../../utils/cn'

import { steps } from './constants'
import type { Step } from './types'

interface StepProgressProps {
  step: Step
}

export const StepProgress = ({ step }: StepProgressProps) => (
  <ol className="grid grid-cols-3 gap-2">
    {steps.map((item) => (
      <li key={item.id} className="text-center">
        <span
          className={cn(
            'mx-auto mb-2 grid size-6 place-items-center rounded-full text-xs font-bold',
            step === item.id
              ? 'bg-secondary text-white'
              : step > item.id
                ? 'bg-emerald-500 text-white'
                : 'bg-secondary/20 text-secondary',
          )}
        >
          {item.id}
        </span>
        <p className="text-xs font-semibold text-tertiary">{item.label}</p>
      </li>
    ))}
  </ol>
)

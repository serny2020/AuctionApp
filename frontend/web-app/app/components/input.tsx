import React from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

type Props = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps

export default function Input(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: '' })

    return (
        <div className="mb-3">
            {props.showLabel && (
                <label 
                    htmlFor={field.name} 
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    {props.label}
                </label>
            )}
            <input
                {...props}
                {...field}
                type={props.type || 'text'}
                placeholder={props.label}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2
                    ${fieldState.error ? 'border-red-500 focus:ring-red-500' : 
                      fieldState.isDirty ? 'border-green-500 focus:ring-green-500' : 
                      'border-gray-300 focus:ring-blue-500'}
                `}
            />
            {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
            )}
        </div>
    )
}

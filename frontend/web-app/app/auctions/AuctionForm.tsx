'use client'

import { FieldValues, useForm } from "react-hook-form";

export default function AuctionForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors }
  } = useForm();

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          {...register("make", { required: "Make is required" })}
          placeholder="Make"
          className={`w-full p-2 border ${errors?.make ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${errors?.make
              ? "focus:ring-red-500"
              : "focus:ring-blue-500"
            }`}
        />
        {errors.make && (
          <p className="mt-1 text-sm text-red-500">
            {errors.make.message as string}
          </p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("model", { required: "Make is required" })}
          placeholder="Model"
          className={`w-full p-2 border ${errors?.make ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${errors?.make
              ? "focus:ring-red-500"
              : "focus:ring-blue-500"
            }`}
        />
        {errors.make && (
          <p className="mt-1 text-sm text-red-500">
            {errors.make.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        {/* Cancel Button */}
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          // disabled={!isValid || isSubmitting}
          className={`px-4 py-2 border rounded-md ${isSubmitting
              ? "bg-green-500 text-white opacity-50 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
            } focus:outline-none focus:ring-2 focus:ring-green-400`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

    </form>
  );
}

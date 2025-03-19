'use client'

import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/input";
import { useEffect } from "react";
import DateInput from "../components/DateInput";
import { useRouter } from "next/navigation";
import { createAuction } from "../actions/auctionActions";

export default function AuctionForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid }
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    setFocus('make');
  }, [setFocus])

  async function onSubmit(data: FieldValues) {
    // console.log(data);
    try {
      const res = await createAuction(data);

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${res.id}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input label='Make' name='make' control={control}
        rules={{ required: 'Make is required' }} />
      <Input label='Model' name='model' control={control}
        rules={{ required: 'Model is required' }} />
      <Input label='Color' name='color' control={control}
        rules={{ required: 'Color is required' }} />

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Year' name='year' control={control} type='number'
          rules={{ required: 'Year is required' }} />
        <Input label='Mileage' name='mileage' control={control} type='number'
          rules={{ required: 'Model is required' }} />
      </div>

      <Input label='Image URL' name='imageUrl' control={control}
        rules={{ required: 'Image URL is required' }} />

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Reserve Price (enter 0 if no reserve)'
          name='reservePrice' control={control} type='number'
          rules={{ required: 'Reserve price is required' }} />
        <DateInput
          label='Auction end date/time'
          name='auctionEnd'
          control={control}
          dateFormat='dd MMMM yyyy h:mm a'
          showTimeSelect
          rules={{ required: 'Auction end date is required' }} />
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
          disabled={!isValid || isSubmitting}
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

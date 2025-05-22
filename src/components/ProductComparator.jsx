
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { searchProduct } from '@utils/searchProduct'
import ProductInfoComparator from './ProductInfoComparator'



const ProductComparator = ({number, token}) => {
  const [selected, setSelected] = useState({})
  const [response, setResponse] = useState(
     {
      products: [],
      page: 0,
      pageSize: 0,
      totalProducts: 0,
      totalPages: 0
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setResponse(await searchProduct({ name: "", token}));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mx-auto w-full px-2'>
      <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm/6 font-medium text-gray-900">Producto {number}: </Label>
      <div className="relative mt-2">
        <ListboxButton name={"desplegable"+number} className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-green sm:text-sm/6">
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span className="block truncate">{selected.name || "Select an option"}</span>
        </span>
        <ChevronUpDownIcon
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
        </ListboxButton>

        <ListboxOptions
        transition
        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
        {response.products.map((item) => (
          <ListboxOption
          key={item.id}
          value={item}
          
          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-primary-green data-focus:text-white data-focus:outline-hidden"
          >
          <div className="flex items-center">
            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{item.name}</span>
          </div>

          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-green group-not-data-selected:hidden group-data-focus:text-white">
            <CheckIcon aria-hidden="true" className="size-5" />
          </span>
          </ListboxOption>
        ))}
        </ListboxOptions>
      </div>
      </Listbox>
      {Object.keys(selected).length > 0 &&
        <ProductInfoComparator selected={selected} token={token} number={number}/>
      }
    </div>
    )
}
export default ProductComparator

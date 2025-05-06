import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Alumno } from '../pages/Alumno'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Alumno[] = [
  {
    id_alumno: 1,
    rut_alumno: '20.941.502-1',
    nombre_alumno: "Martín",
    nombre_completo_alumno: "Martín Castro Morales",
    fecha_nacimiento_alumno: new Date(2001, 11, 21),
    correo_alumno: "martin.castro1@gmail.com"
  },
  {
    id_alumno: 2,
    rut_alumno: '20.941.503-2',
    nombre_alumno: "Josefa",
    nombre_completo_alumno: "Josefa Ramírez Soto",
    fecha_nacimiento_alumno: new Date(2002, 4, 15),
    correo_alumno: "josefa.ramirez@gmail.com"
  },
  {
    id_alumno: 3,
    rut_alumno: '20.941.504-3',
    nombre_alumno: "Lucas",
    nombre_completo_alumno: "Lucas Fernández Ríos",
    fecha_nacimiento_alumno: new Date(2003, 2, 8),
    correo_alumno: "lucas.fernandez@gmail.com"
  },
  {
    id_alumno: 4,
    rut_alumno: '20.941.505-4',
    nombre_alumno: "Isidora",
    nombre_completo_alumno: "Isidora Reyes Fuentes",
    fecha_nacimiento_alumno: new Date(2000, 7, 23),
    correo_alumno: "isidora.reyes@gmail.com"
  },
  {
    id_alumno: 5,
    rut_alumno: '20.941.506-5',
    nombre_alumno: "Tomás",
    nombre_completo_alumno: "Tomás Riquelme Vargas",
    fecha_nacimiento_alumno: new Date(2001, 9, 30),
    correo_alumno: "tomas.riquelme@gmail.com"
  },
  {
    id_alumno: 6,
    rut_alumno: '20.941.507-6',
    nombre_alumno: "Camila",
    nombre_completo_alumno: "Camila Soto Araya",
    fecha_nacimiento_alumno: new Date(2002, 0, 10),
    correo_alumno: "camila.soto@gmail.com"
  },
  {
    id_alumno: 7,
    rut_alumno: '20.941.508-7',
    nombre_alumno: "Ignacio",
    nombre_completo_alumno: "Ignacio Paredes Mena",
    fecha_nacimiento_alumno: new Date(2003, 6, 12),
    correo_alumno: "ignacio.paredes@gmail.com"
  },
  {
    id_alumno: 8,
    rut_alumno: '20.941.509-8',
    nombre_alumno: "Valentina",
    nombre_completo_alumno: "Valentina Núñez Bravo",
    fecha_nacimiento_alumno: new Date(2000, 10, 3),
    correo_alumno: "valentina.nunez@gmail.com"
  },
  {
    id_alumno: 9,
    rut_alumno: '20.941.510-9',
    nombre_alumno: "Benjamín",
    nombre_completo_alumno: "Benjamín Torres Herrera",
    fecha_nacimiento_alumno: new Date(2001, 3, 27),
    correo_alumno: "benjamin.torres@gmail.com"
  },
  {
    id_alumno: 10,
    rut_alumno: '20.941.511-k',
    nombre_alumno: "Antonia",
    nombre_completo_alumno: "Antonia Morales Díaz",
    fecha_nacimiento_alumno: new Date(2002, 5, 6),
    correo_alumno: "antonia.morales@gmail.com"
  }
];

const columnHelper = createColumnHelper<Alumno>()

//const columns = [
  //columnHelper.accessor('rut_alumno', {
    //header: () => "Rut",
    //cell: info => info.getValue(),
    //footer: info => info.column.id,
  //}),
  //columnHelper.accessor(row => row.nombre_alumno, {
    //id: 'nombre_alumno',
    //cell: info => <i>{info.getValue()}</i>,
    //header: () => <span>Nombre Alumno</span>,
    //footer: info => info.column.id,
  //}),
  //columnHelper.accessor('nombre_completo_alumno', {
    //header: () => 'nombre_completo_alumno',
    //cell: info => info.renderValue(),
    //footer: info => info.column.id,
  //}),
  //columnHelper.accessor('fecha_nacimiento_alumno', {
    //header: () => <span>Fecha de nacimiento</span>,
    //footer: info => info.column.id,
  //}),
  //columnHelper.accessor('correo_alumno', {
    //header: 'Correo Electronico',
    //footer: info => info.column.id,
  //}),
//]
const columns = [
  columnHelper.accessor('rut_alumno', {
    header: () => <span>Rut Alumno</span>,
    cell: info => info.getValue(),
    footer: () => <span>Rut Alumno</span>,
  }),
  columnHelper.accessor('nombre_alumno', {
    header: () => <span>Nombre Alumno</span>,
    cell: info => <i>{info.getValue()}</i>,
    footer: () => <span>Nombre Alumno</span>,
  }),
  columnHelper.accessor('nombre_completo_alumno', {
    header: () => <span>Nombre Completo Alumno</span>,
    cell: info => info.renderValue(),
    footer: () => <span>Nombre Completo Alumno</span>,
  }),
  columnHelper.accessor('fecha_nacimiento_alumno', {
    header: () => <span>Fecha Nacimiento Alumno</span>,
    cell: info => {
      const value = info.getValue();
      return value instanceof Date ? value.toLocaleDateString('es-CL') : ''
    },
    footer: () => <span>Fecha Nacimiento Alumno</span>,
  }),
  columnHelper.accessor('correo_alumno', {
    header: () => <span>Correo Alumno</span>,
    cell: info => info.getValue(),
    footer: () => <span>Correo Alumno</span>,
  }),
];

export const TanstackTable = (props : {data: Alumno[]}) => {

  const [data, _setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="">
      <table className='min-w-full border-2 rounded overflow-hidden'>
        <thead className='bg-red-700 font-semibold'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='px-4 py-2 text-left'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=''>
          {table.getRowModel().rows.map(row => (
            <tr className='even:bg-red-500 odd:bg-gray-400 ' key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className=''>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='bg-red-700 font-semibold'>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} className='border'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}
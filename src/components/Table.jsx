/* eslint-disable react/prop-types */
import { CardBody, Typography } from "@material-tailwind/react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

export function Table({ data, columns }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<CardBody className="overflow-auto px-0">
			<table className="mt-4 w-full min-w-max table-auto text-left">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</Typography>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="p-4 border-b border-blue-gray-50"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal"
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</Typography>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</CardBody>
	);
}

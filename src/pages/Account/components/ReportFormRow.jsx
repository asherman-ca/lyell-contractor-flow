import React, { useState } from 'react';
import { db } from '../../../firebase.config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const ReportFormRow = ({ report, setReports, setLoading }) => {
	const [customDate, setCustomDate] = useState();

	const handleDateChange = async (id, delta, endDate) => {
		let date = endDate.toDate();
		date.setDate(date.getDate() + delta);
		const userRef = doc(db, 'users', id);
		await updateDoc(userRef, {
			endDate: date,
		});
		setReports((prev) => {
			return [
				...prev.map((report) => {
					if (report.id == id) {
						report.data.endDate.seconds = endDate.seconds + 86400 * delta;
						return report;
					} else {
						return report;
					}
				}),
			];
		});
	};

	const handleCustomDateChange = async (id, e, endDate) => {
		let date = new Date(e.target.value);
		date.setDate(date.getDate() + 1);
		setCustomDate(date);
	};

	const onSubmit = async (id) => {
		console.log('submit hits');
		console.log(customDate);
		const userRef = doc(db, 'users', id);
		await updateDoc(userRef, {
			endDate: customDate,
		});
		setLoading(true);
	};

	return (
		<div className='table-row' key={report.id}>
			<div className='col'>{report.data.name}</div>
			<div className='col'>{report.data.managerEmail}</div>
			<div className='col'>
				{report.data.endDate
					.toDate()
					.toDateString()
					.split(' ')
					.splice(1)
					.join(' ')}
			</div>
			<div className='col'>
				<div
					className='button'
					onClick={() => handleDateChange(report.id, 30, report.data.endDate)}
				>
					Add Days
				</div>
			</div>
			<div className='col'>
				<div
					className='button'
					onClick={() => handleDateChange(report.id, 60, report.data.endDate)}
				>
					Add Days
				</div>
			</div>
			<div className='col'>
				<div
					className='button'
					onClick={() => handleDateChange(report.id, 90, report.data.endDate)}
				>
					Add Days
				</div>
			</div>
			<div className='col'>
				<input
					type='date'
					onChange={(e) =>
						handleCustomDateChange(report.id, e, report.data.endDate)
					}
				/>
				<div className='button' onClick={() => onSubmit(report.id)}>
					+
				</div>
			</div>
		</div>
	);
};

export default ReportFormRow;
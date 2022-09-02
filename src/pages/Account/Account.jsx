import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const Account = () => {
	const [loading, setLoading] = useState(true);
	const [reports, setReports] = useState();
	const [tableFilter, setTableFilter] = useState('Active');

	useEffect(() => {
		if (loading) {
			const fetch = async () => {
				const ref = collection(db, 'users');
				const snap = await getDocs(ref);
				let reports = [];
				snap.forEach((el) => {
					return reports.push({ data: el.data(), id: el.id });
				});
				setLoading(false);
				setReports(reports);
			};
			fetch();
		}
	}, [loading]);

	const handleFilter = (filter) => {
		setTableFilter(filter);
	};

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
		// console.log('test', Date.parse(e.target.value));
		// console.log('enddate', endDate);
		// let parseDate = Date.parse(e.target.value);
		// console.log('date', parseDate);
		let date = new Date(e.target.value);
		date.setDate(date.getDate() + 1);
		const userRef = doc(db, 'users', id);
		await updateDoc(userRef, {
			endDate: date,
		});
		setLoading(true);
	};

	if (loading) {
		return <div className='account'>Loading...</div>;
	}

	return (
		<div className='account-loaded'>
			{/* {console.log('reports', reports)} */}
			<div className='table-tabs'>
				<div
					onClick={() => handleFilter('Active')}
					className={tableFilter == 'Active' ? 'active' : ''}
				>
					Active
				</div>
				<div
					onClick={() => handleFilter('Deactivated')}
					className={tableFilter == 'Deactivated' ? 'active' : ''}
				>
					Deactivated
				</div>
				<div
					onClick={() => handleFilter('Deleted')}
					className={tableFilter == 'Deleted' ? 'active' : ''}
				>
					Deleted
				</div>
			</div>
			<div className='report-table'>
				<div className='table-header'>
					<div className='col'>Name</div>
					<div className='col'>Manager</div>
					<div className='col'>End Date</div>
					<div className='col'>Extend 30</div>
					<div className='col'>Extend 60</div>
					<div className='col'>Extend 90</div>
					<div className='col'>Choose Date</div>
				</div>
				<div className='table-rows'>
					{/* {console.log('reports in map', reports)} */}
					{reports
						.filter((report) => report.data.status == tableFilter)
						.map((report) => {
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
											onClick={() =>
												handleDateChange(report.id, 30, report.data.endDate)
											}
										>
											Add Days
										</div>
									</div>
									<div className='col'>
										<div
											className='button'
											onClick={() =>
												handleDateChange(report.id, 60, report.data.endDate)
											}
										>
											Add Days
										</div>
									</div>
									<div className='col'>
										<div
											className='button'
											onClick={() =>
												handleDateChange(report.id, 90, report.data.endDate)
											}
										>
											Add Days
										</div>
									</div>
									<div className='col'>
										<input
											type='date'
											onChange={(e) =>
												handleCustomDateChange(
													report.id,
													e,
													report.data.endDate
												)
											}
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Account;

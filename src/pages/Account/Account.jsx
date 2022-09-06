import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

import ReportFormRow from './components/ReportFormRow';

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

	if (loading) {
		return <div className='account'>Loading...</div>;
	}

	return (
		<div className='account-loaded'>
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
					{reports
						.filter((report) => report.data.status == tableFilter)
						.map((report) => {
							return (
								<ReportFormRow
									report={report}
									setLoading={setLoading}
									setReports={setReports}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Account;

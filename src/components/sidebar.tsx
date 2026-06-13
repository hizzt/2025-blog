'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

function getGreeting() {
	const hour = new Date().getHours()
	if (hour >= 6 && hour < 12) return '早上好'
	if (hour >= 12 && hour < 18) return '下午好'
	if (hour >= 18 && hour < 22) return '晚上好'
	return '夜深了'
}

function Clock() {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const hours = time.getHours().toString().padStart(2, '0')
	const minutes = time.getMinutes().toString().padStart(2, '0')
	const seconds = time.getSeconds().toString().padStart(2, '0')

	return (
		<div className='font-mono text-3xl font-light tracking-wider'>
			<span>{hours}</span>
			<span className='animate-pulse'>:</span>
			<span>{minutes}</span>
			<span className='text-secondary text-xl'>:{seconds}</span>
		</div>
	)
}

function Calendar() {
	const now = dayjs()
	const currentDate = now.date()
	const firstDayOfMonth = now.startOf('month')
	const firstDayWeekday = (firstDayOfMonth.day() + 6) % 7
	const daysInMonth = now.daysInMonth()
	const currentWeekday = (now.day() + 6) % 7

	const weekdays = ['一', '二', '三', '四', '五', '六', '日']

	return (
		<div>
			<div className='text-secondary mb-2 text-sm'>
				{now.format('YYYY年M月D日')} {now.format('dddd')}
			</div>
			<div className='grid grid-cols-7 gap-1 text-center text-xs'>
				{weekdays.map((day, i) => (
					<div key={day} className={`py-1 font-medium ${i === currentWeekday ? 'text-brand' : 'text-secondary'}`}>
						{day}
					</div>
				))}
				{Array.from({ length: firstDayWeekday }).map((_, i) => (
					<div key={`empty-${i}`} />
				))}
				{Array.from({ length: daysInMonth }).map((_, i) => {
					const day = i + 1
					return (
						<div
							key={day}
							className={`rounded py-1 ${day === currentDate ? 'bg-brand font-medium text-white' : 'hover:bg-white/60'}`}
						>
							{day}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default function Sidebar() {
	const { siteContent } = useConfigStore()
	const greeting = getGreeting()
	const username = siteContent.meta.username || '逐码'
	const beian = siteContent.beian

	return (
		<aside className='w-[340px] shrink-0 space-y-6 max-lg:hidden'>
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className='card relative p-6'
			>
				<div className='flex items-center gap-4'>
					<Link href='/'>
						<Image
							src='/images/avatar.png'
							alt='avatar'
							width={64}
							height={64}
							className='rounded-full'
							style={{ boxShadow: '0 8px 16px -4px #E2D9CE' }}
						/>
					</Link>
					<div>
						<div className='text-secondary text-sm'>{greeting}</div>
						<div className='font-averia text-xl font-medium'>I'm {username}</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
				className='card relative p-6'
			>
				<Clock />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
				className='card relative p-5'
			>
				<Calendar />
			</motion.div>

			{beian?.text && (
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className='text-secondary text-center text-xs'
				>
					{beian.link ? (
						<a href={beian.link} target='_blank' rel='noreferrer' className='hover:text-brand transition-colors'>
							{beian.text}
						</a>
					) : (
						beian.text
					)}
				</motion.div>
			)}
		</aside>
	)
}

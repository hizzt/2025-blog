'use client'

import { motion } from 'motion/react'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import Link from 'next/link'
import Image from 'next/image'

function getGreeting() {
	const hour = new Date().getHours()
	if (hour >= 6 && hour < 12) return '早上好'
	if (hour >= 12 && hour < 18) return '下午好'
	if (hour >= 18 && hour < 22) return '晚上好'
	return '夜深了'
}

export default function Sidebar() {
	const { siteContent } = useConfigStore()
	const greeting = getGreeting()
	const username = siteContent.meta.username || '逐码'
	const beian = siteContent.beian

	return (
		<aside className='w-[280px] shrink-0 space-y-4 max-lg:hidden'>
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className='card p-6 text-center'
			>
				<Link href='/'>
					<Image
						src='/images/avatar.png'
						alt='avatar'
						width={80}
						height={80}
						className='mx-auto rounded-full'
						style={{ boxShadow: '0 12px 20px -5px #E2D9CE' }}
					/>
				</Link>
				<h2 className='font-averia mt-3 text-xl font-medium'>{username}</h2>
				<p className='text-secondary mt-1 text-sm'>{greeting}</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
				className='card p-4'
			>
				<div className='text-secondary mb-3 text-xs uppercase tracking-wider'>导航</div>
				<nav className='space-y-1'>
					{[
						{ href: '/blog', label: '近期文章' },
						{ href: '/projects', label: '项目展示' },
						{ href: '/about', label: '关于本站' }
					].map(item => (
						<Link
							key={item.href}
							href={item.href}
							className='text-secondary hover:text-brand block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/60'
						>
							{item.label}
						</Link>
					))}
				</nav>
			</motion.div>

			{beian?.text && (
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
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

import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	changeArticleState: (formState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	changeArticleState,
}: ArticleParamsFormProps) => {
	const [articleParamsFormState, setArticleParamsFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleToggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		changeArticleState(articleParamsFormState);
	};

	const handleFormCancel = (event: React.FormEvent) => {
		event.preventDefault();
		changeArticleState(defaultArticleState);
		setArticleParamsFormState(defaultArticleState);
	};

	const handleChangeForm = (selected: OptionType, propertyName: string) => {
		setArticleParamsFormState({
			...articleParamsFormState,
			[propertyName]: selected,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormCancel}>
					<h2 className={styles.formTitle}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={articleParamsFormState.fontFamilyOption}
						title='Шрифт'
						onChange={(value) => handleChangeForm(value, 'fontFamilyOption')}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleParamsFormState.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) => handleChangeForm(value, 'fontSizeOption')}
					/>
					<Select
						options={fontColors}
						selected={articleParamsFormState.fontColor}
						title='Цвет шрифта'
						onChange={(value) => handleChangeForm(value, 'fontColor')}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={articleParamsFormState.backgroundColor}
						title='Цвет фона'
						onChange={(value) => handleChangeForm(value, 'backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						selected={articleParamsFormState.contentWidth}
						title='Ширина контента'
						onChange={(value) => handleChangeForm(value, 'contentWidth')}
					/>
					<div className={styles.bottomContainer}></div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

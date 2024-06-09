import { Text, Title } from '@mantine/core'

import classes from './category-info.module.css'

export function CategoryInfo({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className={classes.card}>
      <Title order={2}>{title}</Title>
      <Text className={classes.desc}>{description}</Text>
    </div>
  )
}
